import { Link } from 'gatsby';
import * as React from 'react';

export default function WelcomeBackBanner({
  lastViewedModuleURL,
  lastViewedModuleLabel,
}) {
  return (
    <div
      className="w-full shadow-sm lg:rounded-lg"
      style={{
        border: '1px solid rgba(240, 194, 255, 0.24)',
        background: 'rgba(244, 237, 234, 0.08)',
      }}
    >
      <Link
        className="block px-4 py-6 sm:flex sm:items-center sm:justify-between sm:p-8"
        to={
          lastViewedModuleURL ||
          '/foundations/arithmetic-nt-basics'
        }
      >
        <div>
          <h3 className="text-xl leading-7 font-medium sm:text-2xl" style={{ color: '#F4EDEA' }}>
            {lastViewedModuleURL
              ? 'Welcome Back!'
              : 'Welcome to the USAMO Guide!'}
          </h3>
          <div className="mt-2 font-medium" style={{ color: '#F0C2FF' }}>
            <p>
              {lastViewedModuleURL
                ? `Pick up where you left off. Your last viewed module was "${lastViewedModuleLabel}."`
                : `Get started on the first module, "Arithmetic and Number Theory Basics."`}
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center lg:mr-2">
          <span className="inline-flex rounded-md shadow-sm">
            <span
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition duration-150 ease-in-out focus:outline-hidden sm:text-base lg:px-8 lg:py-3 lg:text-lg"
              style={{
                borderColor: 'rgba(112, 66, 138, 0.55)',
                backgroundColor: '#70428A',
                color: '#F4EDEA',
              }}
            >
              {lastViewedModuleURL
                ? `Continue: ${lastViewedModuleLabel}`
                : `Get Started: Arithmetic and Number Theory Basics!`}
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
