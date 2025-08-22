
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const CVAdvertisement = () => {
  const linkedinUrl = "https://www.linkedin.com/in/asia-olsen-557b1b156/"; 
  const githubUrl = "https://github.com/asyayakim"; 
  const email = "asiaolsen94@gmail.com"; 

  return (
    <div className="p-6 my-8 border shadow-gray-200 sm:border-rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Interested in Working Together?</h3>
          <p className="mb-4 text-gray-600">
            View my digital CV to learn more about my skills, experience, and projects I've worked on.
          </p>
          <div className="flex space-x-3">
            
            <div className="flex space-x-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 transition-colors hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 transition-colors hover:text-gray-800"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 text-gray-600 transition-colors hover:text-red-500"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 mr-3 bg-blue-100 rounded-full">
              <span className="font-semibold text-blue-600">CV</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Professional Profile</p>
              <p className="text-xs text-gray-500">Updated recently</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAdvertisement;