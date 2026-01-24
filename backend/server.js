/**
 * Null Incorporated - Backend API Server
 * Fetches uptime statistics from BetterStack
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// BetterStack API configuration
const BETTERSTACK_API_URL = 'https://uptime.betterstack.com/api/v2';
const BETTERSTACK_API_KEY = process.env.BETTERSTACK_API_KEY;

// Cache configuration
let uptimeCache = {
    data: null,
    timestamp: 0,
    ttl: 60000 // Cache for 60 seconds
};

// CORS configuration - adjust origins as needed
const corsOptions = {
    origin: [
        'https://n-ull.com',
        'https://www.n-ull.com',
        'http://localhost:3000',
        'http://localhost:8080',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Fetch monitors from BetterStack API
 */
async function fetchBetterStackMonitors() {
    if (!BETTERSTACK_API_KEY) {
        throw new Error('BETTERSTACK_API_KEY not configured');
    }

    const response = await fetch(`${BETTERSTACK_API_URL}/monitors`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${BETTERSTACK_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`BetterStack API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Calculate overall uptime from all monitors
 */
function calculateOverallUptime(monitors) {
    if (!monitors || monitors.length === 0) {
        return null;
    }

    // Get uptime percentages from all monitors
    // BetterStack provides uptime in attributes like 'uptime' or we calculate from status
    let totalUptime = 0;
    let validMonitors = 0;

    for (const monitor of monitors) {
        const attrs = monitor.attributes;

        // BetterStack provides various uptime fields
        // Check for availability/uptime percentage
        if (attrs.availability !== undefined) {
            totalUptime += parseFloat(attrs.availability);
            validMonitors++;
        } else if (attrs.uptime !== undefined) {
            totalUptime += parseFloat(attrs.uptime);
            validMonitors++;
        }
    }

    if (validMonitors === 0) {
        return null;
    }

    return totalUptime / validMonitors;
}

/**
 * Get individual monitor statuses
 */
function getMonitorStatuses(monitors) {
    if (!monitors || monitors.length === 0) {
        return [];
    }

    return monitors.map(monitor => {
        const attrs = monitor.attributes;
        return {
            id: monitor.id,
            name: attrs.pronounceable_name || attrs.url,
            url: attrs.url,
            status: attrs.status, // 'up', 'down', 'paused', 'pending', 'maintenance'
            uptime: attrs.availability || attrs.uptime || null,
            lastCheckedAt: attrs.last_checked_at,
            responseTime: attrs.response_time_ms || null
        };
    });
}

/**
 * API endpoint: Get uptime statistics
 */
app.get('/api/uptime', async (req, res) => {
    try {
        // Check cache first
        const now = Date.now();
        if (uptimeCache.data && (now - uptimeCache.timestamp) < uptimeCache.ttl) {
            return res.json(uptimeCache.data);
        }

        // Fetch fresh data from BetterStack
        const response = await fetchBetterStackMonitors();
        const monitors = response.data || [];

        const overallUptime = calculateOverallUptime(monitors);
        const monitorStatuses = getMonitorStatuses(monitors);

        // Count statuses
        const statusCounts = {
            up: monitorStatuses.filter(m => m.status === 'up').length,
            down: monitorStatuses.filter(m => m.status === 'down').length,
            paused: monitorStatuses.filter(m => m.status === 'paused').length,
            pending: monitorStatuses.filter(m => m.status === 'pending').length,
            maintenance: monitorStatuses.filter(m => m.status === 'maintenance').length
        };

        const result = {
            success: true,
            uptime: overallUptime !== null ? parseFloat(overallUptime.toFixed(2)) : null,
            uptimeFormatted: overallUptime !== null ? `${overallUptime.toFixed(2)}%` : 'N/A',
            totalMonitors: monitors.length,
            statusCounts,
            allOperational: statusCounts.down === 0,
            monitors: monitorStatuses,
            lastUpdated: new Date().toISOString()
        };

        // Update cache
        uptimeCache = {
            data: result,
            timestamp: now,
            ttl: 60000
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching uptime:', error.message);

        // Return cached data if available, even if stale
        if (uptimeCache.data) {
            return res.json({
                ...uptimeCache.data,
                cached: true,
                cacheAge: Date.now() - uptimeCache.timestamp
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to fetch uptime data',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

/**
 * API endpoint: Get specific monitor status
 */
app.get('/api/uptime/:monitorId', async (req, res) => {
    try {
        if (!BETTERSTACK_API_KEY) {
            throw new Error('BETTERSTACK_API_KEY not configured');
        }

        const { monitorId } = req.params;

        const response = await fetch(`${BETTERSTACK_API_URL}/monitors/${monitorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${BETTERSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`BetterStack API error: ${response.status}`);
        }

        const data = await response.json();
        const monitor = data.data;
        const attrs = monitor.attributes;

        res.json({
            success: true,
            monitor: {
                id: monitor.id,
                name: attrs.pronounceable_name || attrs.url,
                url: attrs.url,
                status: attrs.status,
                uptime: attrs.availability || attrs.uptime || null,
                lastCheckedAt: attrs.last_checked_at,
                responseTime: attrs.response_time_ms || null,
                createdAt: attrs.created_at
            }
        });
    } catch (error) {
        console.error('Error fetching monitor:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch monitor data'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Null Incorporated API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Uptime API: http://localhost:${PORT}/api/uptime`);

    if (!BETTERSTACK_API_KEY) {
        console.warn('WARNING: BETTERSTACK_API_KEY is not set. API calls will fail.');
    }
});

module.exports = app;
