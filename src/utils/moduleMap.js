// src/utils/moduleMap.js

/**
 * Maps route paths to module IDs for progress tracking
 */
export const MODULE_MAP = {
  // Introduction to Cybersecurity Course (Course ID: 1)
  '/course/intro-to-cybersecurity/moduleOne': 1,          // CIA Triad
  '/course/intro-to-cybersecurity/AttacksDefensemodule': 2, // Attacks & Defense
  '/course/intro-to-cybersecurity/SEmodule': 3,           // Social Engineering
  '/course/intro-to-cybersecurity/OSImodule': 4,          // OSI Model
  '/course/intro-to-cybersecurity/labModule': 5,          // Basic Unix Commands
  '/course/intro-to-cybersecurity/labModule2': 6,         // Advanced Unix Commands
  '/course/intro-to-cybersecurity/Jobsmodule': 7,         // Cybersecurity Jobs
  '/course/intro-to-cybersecurity/FinalQuiz': 8,          // Final Quiz
  
  // Sample Course 202 (Course ID: 2)
  '/course/sample-202/module1': 101,
  '/course/sample-202/module2': 102,
  
  // Sample Course 303 (Course ID: 3)
  '/course/sample-303/module1': 201
};

/**
 * Maps module IDs to their course IDs
 */
export const MODULE_TO_COURSE_MAP = {
  // Intro to Cybersecurity modules
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1,
  
  // Sample Course 202 modules
  101: 2, 102: 2,
  
  // Sample Course 303 modules
  201: 3
};

/**
 * Gets the module ID from the current route
 * @param {string} route - Current route path
 * @returns {number|null} - Module ID or null if not found
 */
export function getModuleIdFromRoute(route) {
  return MODULE_MAP[route] || null;
}

/**
 * Gets the course ID from a module ID
 * @param {number} moduleId - Module ID
 * @returns {number|null} - Course ID or null if not found
 */
export function getCourseIdFromModuleId(moduleId) {
  return MODULE_TO_COURSE_MAP[moduleId] || null;
}