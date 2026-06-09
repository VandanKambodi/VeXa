import React from "react";
import { useState, useEffect } from "react";
import ProjectCard from "../components/Card";
import Styled, { useTheme } from "styled-components";
import ProjectStatCard from "../components/ProjectStatCard";
import { Add } from "@mui/icons-material";
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LinearProgress } from "@mui/material";
import { statuses, data, tagColors } from "../data/data";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { getProjects, userTasks } from "../api";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Container = Styled.div`
  padding: 24px 32px;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Section = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* Crucial to prevent vertical stretching & overlapping */
  justify-content: flex-start;
  gap: 32px;
  width: 100%;

  @media (max-width: 960px) {
    flex-direction: column-reverse; /* Stacks Left under Right on mobile */
    gap: 24px;
  }
`;

const Left = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  flex: 1 1 70%; /* Takes 70% of row width */
  min-width: 0; /* Prevents flex children from pushing bounds out */

  @media (max-width: 960px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const Right = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex: 1 1 30%; /* Takes 30% of row width */
  min-width: 260px; /* Safe minimum width for the buttons */

  @media (max-width: 960px) {
    flex: 1 1 100%;
    width: 100%;
    min-width: 100%;
  }
`;

const TopBar = Styled.div`
  display: flex;
  flex-direction: column; /* Stacked for a sleek sidebar look on Desktop */
  gap: 16px;
  width: 100%;

  @media (max-width: 960px) {
    flex-direction: row;
    flex-wrap: wrap; /* Allows buttons to sit side-by-side on tablet */
  }

  @media (max-width: 600px) {
    flex-direction: column; /* Stacks buttons on tiny phone screens */
  }
`;

const CreateButton = Styled.div`
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  border-radius: 16px;
  background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
  white-space: nowrap; /* Keeps text on one line */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(124, 58, 237, 0.35);
  }

  /* Make them stretch equally on mobile row layout */
  @media (max-width: 960px) {
    flex: 1;
    justify-content: center; /* Centers content when stretched horizontally */
  }

  ${({ btn }) =>
    btn === "team" &&
    `
    color: #1a1a1a;
    background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
    box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
    &:hover {
      box-shadow: 0 12px 32px rgba(245, 158, 11, 0.35);
    }
  `}
`;

const Icon = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.card || '#ffffff'};
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const StatsWrapper = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* Adjusted minmax to prevent blowing out bounds */
  grid-gap: 24px;
  width: 100%;
`;

const StatCard = Styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.card || theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.soft2};
  }
`;

const RecentProjects = Styled.div`
  width: 100%;
  border-radius: 12px;
  margin-top: 8px;
`;

const SectionTitle = Styled.h2` 
  font-size: 20px;
  font-weight: 700;
  margin: 0px 0px 20px 0px;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.5px;
`;

const TotalProjects = Styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TaskCompleted = Styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Progress = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
`;

const ProgressText = Styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Desc = Styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* prevents text overflow */
`;

const Title = Styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;

const Span = Styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  margin: 0 4px;
`;

function CircularProgressWithLabel(props) {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} thickness={6} size="60px" style={{ color: theme.primary }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="inherit"
        >{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
}

const Dashboard = ({ setNewProject, setNewTeam, newProject }) => {

  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [totalProjectsDone, setTotalProjectsDone] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTasksDone, setTotalTasksDone] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const getprojects = async () => {
    setLoading(true);
    await getProjects(token)
      .then((res) => {
        setProjects(res.data);
        getTotalProjectsDone();
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: err.response?.data?.message || err.message,
            severity: "error",
          })
        );
      });
  };

  const getTotalProjectsDone = () => {
    setTotalProjectsDone(projects.filter((project) => project.status.toString().toLowerCase() === "completed").length);
    setTotalProjects(projects.length);
  };

  const getTasks = async () => {
    setLoading(true);
    await userTasks(token)
      .then((res) => {
        setTasks(res.data);
        getTotalTasks();
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response?.data?.message || err.message,
            severity: "error",
          })
        );
        setLoading(false);
      });
  };

  const getTotalTasks = async () => {
    setTotalTasks(tasks.length);
    setTotalTasksDone(tasks.filter((task) => task.status.toString().toLowerCase() === "completed").length);
  }

  useEffect(() => {
    getprojects();
    getTasks();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProject]);


  return (
    <Container>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '12px 0px', height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Section>
          <Left>
            <StatsWrapper>
              <StatCard>
                <TotalProjects>
                  <Title>Total Projects Done</Title>
                  <Progress>
                    <LinearProgress
                      sx={{
                        borderRadius: "10px", height: 8, flex: 1
                      }}
                      variant="determinate"
                      value={
                        totalProjectsDone === 0
                          ? 0
                          : (totalProjectsDone / totalProjects) * 100
                      }
                    />
                    <ProgressText>{totalProjectsDone.toString()}</ProgressText>
                  </Progress>
                  <Desc>Working on
                    <Span> {(totalProjects - totalProjectsDone).toString()} </Span>
                    projects</Desc>
                </TotalProjects>
              </StatCard>

              <StatCard>
                <TaskCompleted>
                  <Title>Total Tasks Done</Title>
                  <Progress>
                    <LinearProgress
                      sx={{ borderRadius: "10px", height: 8, flex: 1 }}
                      variant="determinate"
                      value={
                        totalTasksDone === 0
                          ? 0
                          : (totalTasksDone / totalTasks) * 100
                      }
                      color={"success"}
                    />
                    <ProgressText>{totalTasksDone}</ProgressText>
                  </Progress>
                  <Desc><Span>{totalTasks - totalTasksDone}</Span> tasks remaining</Desc>
                </TaskCompleted>
              </StatCard>
            </StatsWrapper>

            <RecentProjects>
              <SectionTitle>Recent Projects</SectionTitle>
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
                <Masonry gutter="16px">
                  {
                    projects
                      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                      .filter((item, index) => index < 6)
                      .map((project, id) => (
                        <ProjectCard
                          key={project._id}
                          item={project}
                          index={id}
                          status={project.status}
                          tagColor={tagColors[3]}
                        />
                      ))
                  }
                </Masonry>
              </ResponsiveMasonry>
            </RecentProjects>

          </Left>
          
          <Right>
            <TopBar>
              <CreateButton onClick={() => setNewProject(true)}>
                <Icon>
                  <Add style={{ color: '#7C3AED' }} />
                </Icon>
                Create New Project
              </CreateButton>
              <CreateButton btn="team" onClick={() => setNewTeam(true)}>
                <Icon>
                  <Add style={{ color: '#D97706' }} />
                </Icon>
                Create New Team
              </CreateButton>
            </TopBar>
          </Right>
        </Section>
      )}
    </Container >
  );
};

export default Dashboard;