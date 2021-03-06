const JOB_INFO = [
  {
    department: 'Finance',
    title: 'Accountant',
  },
  {
    department: 'Sales',
    title: 'Account Executive',
  },
  {
    department: 'Product',
    title: 'Consultant',
  },
  {
    department: 'Product',
    title: 'Designer',
  },
  {
    department: 'Operations',
    title:   'Executive Assistant',
  },
  {
    department: 'Legal',
    title:   'Lawyer',
  },
  {
    department: 'Legal',
    title:   'Legal Assistant',
  },
  {
    department: 'Product',
    title:   'Product Manager',
  },
  {
    department: 'Sales',
    title:   'Sales Development Representative',
  },
  {
    department: 'Product',
    title:   'Quality Engineer',
  },
  {
    department: 'Product',
    title:   'Software Engineer',
  },
  {
    department: 'Product',
    title:   'Engineering Manager',
  },
  {
    department: 'Operations',
    title:   'Recruiter',
  },
  {
    department: 'Operations',
    title:   'Recruiting Coordinator',
  },
  {
    department: 'Finance',
    title:   'Financial Analyst',
  },
  {
    department: 'Product',
    title:   'Data Analyst',
  },
  {
    department: 'Finance',
    title:   'Auditor',
  },
  {
    department: 'Marketing',
    title: 'Product Marketing Manager',
  },
  {
    department: 'Marketing',
    title: 'Market Research Analyst',
  }
];

export const addJobInfoToPerson = (person) => {
  const personCopy = { ...person };
  const randomIndex = Math.floor(Math.random() * JOB_INFO.length);
  personCopy.employeeinfo = JOB_INFO[randomIndex];
  return personCopy;
};
