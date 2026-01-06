import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AuthPage } from './pages/Auth';
import { ServiceModal } from './components/ServiceModal';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { Budget } from './pages/Budget';
import { Memorial } from './pages/Memorial';
import { Artifacts } from './pages/Artifacts';
import { ServiceItem, ProjectDetails } from './types';
import { CDHUUpdate } from './pages/CDHUUpdate';
import { Help } from './pages/Help';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Modals state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Data state
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);

  // Workflow state
  const [memorialGenerated, setMemorialGenerated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setServices([]);
    setProjectDetails(null);
    setMemorialGenerated(false);
  };

  // Step 1: Start New Project -> Open Project Details Modal
  const startNewProject = () => {
    setServices([]);
    setMemorialGenerated(false);
    setProjectDetails(null);
    setIsProjectModalOpen(true);
  };

  // Step 2: Save Project Details -> Open Service Modal (optional, or just go to dashboard)
  const handleProjectDetailsSubmit = (details: ProjectDetails) => {
    setProjectDetails(details);
    setIsProjectModalOpen(false);
    // Automatically open service modal to start adding items
    setIsServiceModalOpen(true);
  };

  // Step 3: Add Service
  const handleAddService = (service: ServiceItem) => {
    setServices([...services, service]);
    setIsServiceModalOpen(false);
    setMemorialGenerated(false);
  };

  const handleMemorialComplete = () => {
    setMemorialGenerated(true);
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ?
              <Navigate to="/dashboard" /> :
              <AuthPage type="login" onAuthSuccess={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ?
              <Navigate to="/dashboard" /> :
              <AuthPage type="register" onAuthSuccess={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                <Dashboard
                  onNewMemorial={startNewProject}
                  services={services}
                  memorialGenerated={memorialGenerated}
                  projectDetails={projectDetails}
                  onAddServiceClick={() => setIsServiceModalOpen(true)}
                />
                <ServiceModal
                  isOpen={isServiceModalOpen}
                  onClose={() => setIsServiceModalOpen(false)}
                  onAddService={handleAddService}
                />
                <ProjectDetailsModal
                  isOpen={isProjectModalOpen}
                  onClose={() => setIsProjectModalOpen(false)}
                  onSubmit={handleProjectDetailsSubmit}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/memorial"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                <Memorial
                  services={services}
                  onComplete={handleMemorialComplete}
                  projectDetails={projectDetails}
                />
                <ServiceModal
                  isOpen={isServiceModalOpen}
                  onClose={() => setIsServiceModalOpen(false)}
                  onAddService={handleAddService}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                {memorialGenerated ? (
                  <Budget
                    services={services}
                    projectDetails={projectDetails}
                  />
                ) : (
                  <Navigate to="/memorial" />
                )}
                <ServiceModal
                  isOpen={isServiceModalOpen}
                  onClose={() => setIsServiceModalOpen(false)}
                  onAddService={handleAddService}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/artifacts"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                {memorialGenerated ? (
                  <Artifacts
                    services={services}
                    projectDetails={projectDetails}
                  />
                ) : (
                  <Navigate to="/memorial" />
                )}
                <ServiceModal
                  isOpen={isServiceModalOpen}
                  onClose={() => setIsServiceModalOpen(false)}
                  onAddService={handleAddService}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cdhu-update"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                <CDHUUpdate />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout} onNewMemorial={startNewProject}>
                <Help />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;