import { useMemo, useRef, useState } from 'react'
import { useProjectStack } from '../hooks/useProjectStack'

function ProjectStack({ projects, galleryRef }) {
  const stageRef = useRef(null)
  const paneRefs = useRef([])
  const [enabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const names = useMemo(() => projects.map((project) => project.name), [projects])

  useProjectStack(stageRef, paneRefs, galleryRef, names, enabled)

  if (!enabled) return null

  return (
    <div ref={stageRef} className="stack-stage" aria-hidden="true">
      <div className="stack-stage__pin">
        <span>Selected work</span>
        <span>{String(projects.length).padStart(2, '0')} pieces ↓</span>
      </div>

      <div className="stack-layer">
        {projects.map((project, i) => (
          <div
            key={project.name}
            ref={(node) => { paneRefs.current[i] = node }}
            className="stack-pane"
            style={{ zIndex: projects.length - i }}
          >
            <img src={project.preview} alt="" />
            <span className="stack-pane__label">{project.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectStack
