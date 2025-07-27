import { useProjects } from "../../context/ProjectContext";
import { useForms } from "../../context/FormContext";
import ProjectCard from "../projectCard/ProjectCard";
import "./RecentWorks.css";
import FormCard from "../formCard/FormCard";
function RecentWorks() {
  const { projects } = useProjects();
  const { standaloneForms } = useForms();

  const recentItems = [...projects, ...standaloneForms]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) - new Date(a.updatedAt)
    )
    .slice(0, 4);

  return (
    <div className='recent-works'>
      <h2 className='section-title'>Recent Works</h2>
      {recentItems.length === 0 ? (
        <p>No Projects or Forms available.</p>
      ) : (
        <div className='works-grid'>
          {recentItems.map((item) =>
            item.name ? (
              <ProjectCard
                key={item._id}
                project={item}
              />
            ) : (
              <FormCard
                key={item._id}
                form={item}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default RecentWorks;
