import ProjectCard from "../../../components/projectCard/ProjectCard";
import ResponseChart from "../../../components/responseChart/ResponseChart";
import StatCard from "../../../components/statCard/StatCard";
import { useProjects } from "../../../context/ProjectContext";
import "./Analysis.css";
const Analysis = () => {
  const { filteredProjects } = useProjects();
  return (
    <div className='analysis-page'>
      <div className='stats-section'>
        <div className='stat-card-section'>
          <StatCard
            title='Views'
            value='7,265'
            change='+11.01%'
            isPositive={true}
          />
          <StatCard
            title='Views'
            value='7,265'
            change='+11.01%'
            isPositive={true}
          />
        </div>
        <div className='response-chart-section'>
          <ResponseChart />
        </div>
      </div>
      <div className='file-grid'>
        {filteredProjects.map((project) => {
          return (
            <ProjectCard
              key={project._id}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Analysis;
