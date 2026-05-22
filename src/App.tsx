import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import CoursesTab from './components/CoursesTab';
import ResultsTab from './components/ResultsTab';
import AIAssistantTab from './components/AIAssistantTab';
import ApplyTab from './components/ApplyTab';
import AdminPanelTab from './components/AdminPanelTab';
import StudentDashboardTab from './components/StudentDashboardTab';

import { getDatabase, saveDatabase } from './mockData';
import { DatabaseSchema, EnrollmentApplication } from './types';

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = React.useState<string>('home');
  
  // High-performance selected Course ID state
  const [selectedCourseId, setSelectedCourseId] = React.useState<string>('');

  // Primary persistent storage state
  const [db, setDb] = React.useState<DatabaseSchema>(() => getDatabase());

  // Automatically scroll to top whenever tab switches
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Synchronize database updates across views
  const updateDatabase = (updatedDb: DatabaseSchema) => {
    // Retain internal teachers if passed partially
    const mergedDb: DatabaseSchema = {
      ...updatedDb,
      teachers: updatedDb.teachers.length > 0 ? updatedDb.teachers : db.teachers
    };
    setDb(mergedDb);
    saveDatabase(mergedDb);
  };

  // Add new enrollment application from register screen
  const handleAddNewApplication = (newApp: EnrollmentApplication) => {
    const updatedApps = [...db.applications, newApp];
    const updatedDb: DatabaseSchema = {
      ...db,
      applications: updatedApps
    };
    updateDatabase(updatedDb);
  };

  // Highlight active administrative status indicator
  const isAdminLoggedIn = db.applications.some(app => app.status === 'new');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800" id="main-application-shell">
      
      {/* 1. Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        phone={db.config.phone}
        isAdminLoggedIn={isAdminLoggedIn}
        config={db.config}
      />

      {/* 2. Primary Page Router View */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full" id="main-content-canvas">
        {activeTab === 'home' && (
          <HomeTab 
            config={db.config}
            courses={db.courses}
            teachers={db.teachers}
            results={db.results}
            setActiveTab={setActiveTab}
            setSelectedCourseId={setSelectedCourseId}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesTab 
            courses={db.courses}
            setActiveTab={setActiveTab}
            setSelectedCourseId={setSelectedCourseId}
          />
        )}

        {activeTab === 'results' && (
          <ResultsTab 
            results={db.results}
          />
        )}

        {activeTab === 'student-dashboard' && (
          <StudentDashboardTab 
            students={db.students || []}
            courses={db.courses}
            onUpdateStudents={(updatedStudents) => {
              updateDatabase({
                ...db,
                students: updatedStudents
              });
            }}
          />
        )}

        {activeTab === 'ai-chat' && (
          <AIAssistantTab 
            courses={db.courses}
            setActiveTab={setActiveTab}
            setSelectedCourseId={setSelectedCourseId}
            phone={db.config.phone}
            quizQuestions={db.quizQuestions || []}
          />
        )}

        {activeTab === 'apply' && (
          <ApplyTab 
            courses={db.courses}
            selectedCourseId={selectedCourseId}
            onAddApplication={handleAddNewApplication}
            phone={db.config.phone}
            address={db.config.address}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanelTab 
            courses={db.courses}
            results={db.results}
            applications={db.applications}
            config={db.config}
            teachers={db.teachers}
            quizQuestions={db.quizQuestions || []}
            onUpdateDatabase={updateDatabase}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer 
        config={db.config}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
