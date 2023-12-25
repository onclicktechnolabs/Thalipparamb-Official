import {
  Briefcase,
  ListTask,
  People,
  Bullseye,
  PencilSquare,
} from "react-bootstrap-icons";

export const projectsStats = [
  {
    id: 1,
    title: "Users",
    value: 18,

    icon: <People size={18} />,
    statInfo: '<span className="text-dark me-2">2</span> Completed',
  },
  {
    id: 2,
    title: "Complaints",
    value: 132,
    icon: <ListTask size={18} />,
    statInfo: '<span className="text-dark me-2">28</span> Completed',
  },
  {
    id: 3,
    title: "Events",
    value: 12,
    icon: <Briefcase size={18} />,
    statInfo: '<span className="text-dark me-2">1</span> Completed',
  },
  {
    id: 4,
    title: "Happiness",
    value: 16,
    icon: <Bullseye size={18} />,
    statInfo: '<span className="text-dark me-2">5</span> Completed',
  },
];
export default projectsStats;
