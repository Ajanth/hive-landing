import {
  BellIcon,
  ColumnsIcon,
  GitPullRequestIcon,
  NotePencilIcon,
  PlusSquareIcon,
} from "@phosphor-icons/react"

export function FeatureOrbit() {
  return (
    <ul className="feature-orbit" aria-label="Hive features">
      <li className="feature-anchor feature-notes" data-feature="notes" data-angle="-2">
        <div className="feature-card">
          <NotePencilIcon size={18} aria-hidden="true" />
          <h2>Notes</h2>
          <p>Keep context close.</p>
        </div>
      </li>
      <li className="feature-anchor feature-reminders" data-feature="reminders" data-angle="2">
        <div className="feature-card">
          <BellIcon size={18} aria-hidden="true" />
          <h2>Reminders</h2>
          <p>On your schedule.</p>
        </div>
      </li>
      <li className="feature-anchor feature-kanban" data-feature="kanban" data-angle="-1">
        <div className="feature-card">
          <ColumnsIcon size={18} aria-hidden="true" />
          <h2>Kanban board</h2>
          <div className="mini-board" role="img" aria-label="Illustrative Kanban board with three task columns">
            <div className="mini-column">
              <span className="mini-column-label">To do</span>
              <span className="mini-task" aria-hidden="true" />
            </div>
            <div className="mini-column">
              <span className="mini-column-label">Doing</span>
              <span className="mini-task" aria-hidden="true" />
            </div>
            <div className="mini-column">
              <span className="mini-column-label">Done</span>
              <span className="mini-task" aria-hidden="true" />
            </div>
          </div>
        </div>
      </li>
      <li className="feature-anchor feature-tasks" data-feature="tasks" data-angle="1.5">
        <div className="feature-card">
          <PlusSquareIcon size={18} aria-hidden="true" />
          <h2>Task Management</h2>
          <p>Ideas into action.</p>
        </div>
      </li>
      <li className="feature-anchor feature-github" data-feature="github" data-angle="-1.5">
        <div className="feature-card">
          <GitPullRequestIcon size={18} aria-hidden="true" />
          <h2>GitHub</h2>
          <p>Commits &amp; PRs.</p>
        </div>
      </li>
    </ul>
  )
}
