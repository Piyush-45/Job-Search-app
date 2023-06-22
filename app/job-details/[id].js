import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,

} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import Exp from "../../components/jobdetails/Exp";

const tabs = ["About", "Employement Type", "Publisher"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Employement Type":
        return (
          <Exp
            title="Employement Type"
            points={data[0].job_employment_type ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Publisher":
        return (
          <Exp
            title="Publisher"
            points={data[0].job_publisher?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results/"}
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;


// "data": Array [
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlMuZXvFeQEeIf3dVQ_jt0URaMM7to_8bQCit&s=0",
//     "employer_name": "Blenheim Chalcot India",
//     "employer_website": "http://www.blenheimchalcot.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://boards.greenhouse.io/blenheimchalcotindia/jobs/5094418",
//     "job_apply_quality_score": 0.9017,
//     "job_benefits": null,
//     "job_city": "Mumbai",
//     "job_country": "IN",
//     "job_description": "We are seeking a skilled React JS Developer with experience in Redux to join our dynamic team. As a React JS Developer, you will be responsible for developing and implementing user interface components using React JS concepts and Redux state management. Your primary focus will be on creating reusable and efficient components, ensuring the smooth integration of front-end elements with the back-end services.

// Responsibilities:
// • Develop user interface components using React JS concepts and best practices.
// • Collaborate with the design and development teams to ensure the technical feasibility of UI/UX designs.
// • Build efficient and reusable front-end systems and abstractions.
// • Implement state management using Redux to manage complex application states.
// • Participate in code reviews to maintain code quality and ensure adherence to coding standards.
// • Optimize applications for maximum speed and scalability.
// • Stay up-to-date with the latest industry trends and technologies related to React JS and Redux.
// • Troubleshoot and debug issues as they arise, providing timely resolution.

// Requirement:
// • Bachelor's degree in Computer Science, Engineering, or a related field.
// • Proven work experience as a React JS Developer with a strong understanding of React JS concepts and principles.
// • Minimum 3-7 years of experience in developing web applications using React JS and Redux.
// • Proficient in JavaScript, HTML, CSS, and related web technologies.
// • Experience with Redux and its middleware libraries (e.g., Redux Saga, Redux Thunk).
// • Familiarity with RESTful APIs and asynchronous request handling.
// • Strong understanding of front-end build tools and workflows (e.g., Webpack, Babel).
// • Knowledge of version control systems such as Git.
// • Excellent problem-solving and analytical skills.
// • Good communication and collaboration abilities.
// • Ability to work in a fast-paced, agile development environment.

// Work Location: Turbhe, Navi Mumbai or Andheri, Mumbai",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer+in+india&htidocid=y5_5YcvgqwQAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "y5_5YcvgqwQAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 19.075983,
//     "job_longitude": 72.877655,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": null,
//     "job_offer_expiration_timestamp": null,
//     "job_onet_job_zone": "3",
//     "job_onet_soc": "15113400",
//     "job_posted_at_datetime_utc": "2023-06-06T00:00:00.000Z",
//     "job_posted_at_timestamp": 1686009600,
//     "job_posting_language": "en",
//     "job_publisher": "Greenhouse",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": false,
//       "degree_mentioned": true,
//       "degree_preferred": true,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": 36,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "MH",
//     "job_title": "React JS Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7WONOVA2rBN7eK5TdGD80qda1p7hh1HzwedD&s=0",
//     "employer_name": "Talent Junction",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/react-developer-at-talent-junction-3639280942",
//     "job_apply_quality_score": 0.5925,
//     "job_benefits": null,
//     "job_city": "New Delhi",
//     "job_country": "IN",
//     "job_description": "Position : React Developer

// Location : Delhi

// Experience : 5+ Years

// Bachelors degree in computer science, information technology, or a similar field
// • 5 Years of experience working as a ReactJS developer
// • In-depth knowledge of JavaScript, TypeScript, CSS, HTML, and front-end languages
// • In-depth knowledge of chart libraries in react.js such as Highcharts, ChartJs etc.
// • Knowledge of REACT tools including React.js, Webpack, Enzyme, Redux, and Flux
// • Experience with user interface design
// • Experience working with RESTful APIs
// • Knowledge of performance testing frameworks including Mocha and Jest
// • Familiarity with newer specifications of ECMAScript
// • Experience with data structure libraries (e.g., Immutable.js)
// • Experience with browser-based debugging and performance testing software
// • Knowledge of modern authorization mechanisms, such as JSON Web Token
// • Familiarity with modern front-end build pipelines and tools
// • Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
// • Familiarity with Git ,Excellent troubleshooting skills
// • Good time management skills

// This job is provided by Shine.com",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer+in+india&htidocid=jS_WUvh15tcAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "jS_WUvh15tcAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 28.61394,
//     "job_longitude": 77.20902,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": "2023-07-20T05:55:41.000Z",
//     "job_offer_expiration_timestamp": 1689832541,
//     "job_onet_job_zone": "3",
//     "job_onet_soc": "15113400",
//     "job_posted_at_datetime_utc": "2023-06-20T05:55:27.000Z",
//     "job_posted_at_timestamp": 1687240527,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": true,
//       "degree_preferred": true,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": 60,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "DL",
//     "job_title": "React Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotpNzydbSWoAn9p_4ZzzuYSF4pylAZ07N26wi&s=0",
//     "employer_name": "Entiovi Technologies",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/senior-reactjs-developer-at-entiovi-technologies-3637028262",
//     "job_apply_quality_score": 0.5863,
//     "job_benefits": null,
//     "job_city": "Kolkata",
//     "job_country": "IN",
//     "job_description": "ReactJS/NodeJS DEVELOPER (Entiovi)

// Introduction

// We at Entiovi Technologies, provide digital transformation using new-age intelligent technologies for more than 5 years. We have clients located primarily in the US and Europe that are served by our Dedicated teams. This job is part of our expansion in India.

// Job Briefing

// As a part of this role, you will :

// ⦁ Work with development teams and product managers to ideate software solutions

// ⦁ Build front-end application using ReactJS

// ⦁ Develop and manage well-functioning databases and applications

// ⦁ Troubleshoot, debug and upgrade software

// ⦁ Build features and applications with a mobile responsive design

// ⦁ Provide design feedback to our design team

// ⦁ Be responsible for end-to-end development and support cycle

// ⦁ Follow the best software development practices

// ⦁ Provide client-facing presentations and support as and when needed

// To be successful in this role, you must have,

// ⦁ Strong knowledge and at least 3 years of experience in JavaScript and any of the JavaScript frameworks (React.js/Node.js/Vue js) - (React.js and Node.js are preferred)

// ⦁ Frontend/Backend Application development experience with Node.js(preferred)

// ⦁ Have worked on at least 3 live projects each with a minimum project duration of 6 months.

// ⦁ Familiarity with databases - Postgres / MongoDB, No- SQL Database

// ⦁ Brief knowledge of HTML/CSS, bootstrap and development knowledge of responsive screens

// ⦁ Good communication skills and interpersonal relationship skills

// ⦁ Strong problem-solving and analytical skills

// ⦁ Experience of working with latest design patterns

// ⦁ Passion for clean design and library/modular grade coding

// ⦁ Ability to work in agile methodologies in a distributed team environment.

// ⦁ Experience working with Git

// Experience level,

// ⦁ Mid-Senior level

// It would be nice if yo...(truncated to the first 10000 characters)
// Object {
// "data": Array [
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlMuZXvFeQEeIf3dVQ_jt0URaMM7to_8bQCit&s=0",
//     "employer_name": "Blenheim Chalcot India",
//     "employer_website": "http://www.blenheimchalcot.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://boards.greenhouse.io/blenheimchalcotindia/jobs/5094418",
//     "job_apply_quality_score": 0.9017,
//     "job_benefits": null,
//     "job_city": "Mumbai",
//     "job_country": "IN",
//     "job_description": "We are seeking a skilled React JS Developer with experience in Redux to join our dynamic team. As a React JS Developer, you will be responsible for developing and implementing user interface components using React JS concepts and Redux state management. Your primary focus will be on creating reusable and efficient components, ensuring the smooth integration of front-end elements with the back-end services.

// Responsibilities:
// • Develop user interface components using React JS concepts and best practices.
// • Collaborate with the design and development teams to ensure the technical feasibility of UI/UX designs.
// • Build efficient and reusable front-end systems and abstractions.
// • Implement state management using Redux to manage complex application states.
// • Participate in code reviews to maintain code quality and ensure adherence to coding standards.
// • Optimize applications for maximum speed and scalability.
// • Stay up-to-date with the latest industry trends and technologies related to React JS and Redux.
// • Troubleshoot and debug issues as they arise, providing timely resolution.

// Requirement:
// • Bachelor's degree in Computer Science, Engineering, or a related field.
// • Proven work experience as a React JS Developer with a strong understanding of React JS concepts and principles.
// • Minimum 3-7 years of experience in developing web applications using React JS and Redux.
// • Proficient in JavaScript, HTML, CSS, and related web technologies.
// • Experience with Redux and its middleware libraries (e.g., Redux Saga, Redux Thunk).
// • Familiarity with RESTful APIs and asynchronous request handling.
// • Strong understanding of front-end build tools and workflows (e.g., Webpack, Babel).
// • Knowledge of version control systems such as Git.
// • Excellent problem-solving and analytical skills.
// • Good communication and collaboration abilities.
// • Ability to work in a fast-paced, agile development environment.

// Work Location: Turbhe, Navi Mumbai or Andheri, Mumbai",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer+in+india&htidocid=y5_5YcvgqwQAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "y5_5YcvgqwQAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 19.075983,
//     "job_longitude": 72.877655,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": null,
//     "job_offer_expiration_timestamp": null,
//     "job_onet_job_zone": "3",
//     "job_onet_soc": "15113400",
//     "job_posted_at_datetime_utc": "2023-06-06T00:00:00.000Z",
//     "job_posted_at_timestamp": 1686009600,
//     "job_posting_language": "en",
//     "job_publisher": "Greenhouse",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": false,
//       "degree_mentioned": true,
//       "degree_preferred": true,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": 36,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "MH",
//     "job_title": "React JS Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7WONOVA2rBN7eK5TdGD80qda1p7hh1HzwedD&s=0",
//     "employer_name": "Talent Junction",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/react-developer-at-talent-junction-3639280942",
//     "job_apply_quality_score": 0.5925,
//     "job_benefits": null,
//     "job_city": "New Delhi",
//     "job_country": "IN",
//     "job_description": "Position : React Developer

// Location : Delhi

// Experience : 5+ Years

// Bachelors degree in computer science, information technology, or a similar field
// • 5 Years of experience working as a ReactJS developer
// • In-depth knowledge of JavaScript, TypeScript, CSS, HTML, and front-end languages
// • In-depth knowledge of chart libraries in react.js such as Highcharts, ChartJs etc.
// • Knowledge of REACT tools including React.js, Webpack, Enzyme, Redux, and Flux
// • Experience with user interface design
// • Experience working with RESTful APIs
// • Knowledge of performance testing frameworks including Mocha and Jest
// • Familiarity with newer specifications of ECMAScript
// • Experience with data structure libraries (e.g., Immutable.js)
// • Experience with browser-based debugging and performance testing software
// • Knowledge of modern authorization mechanisms, such as JSON Web Token
// • Familiarity with modern front-end build pipelines and tools
// • Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
// • Familiarity with Git ,Excellent troubleshooting skills
// • Good time management skills

// This job is provided by Shine.com",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer+in+india&htidocid=jS_WUvh15tcAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "jS_WUvh15tcAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 28.61394,
//     "job_longitude": 77.20902,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": "2023-07-20T05:55:41.000Z",
//     "job_offer_expiration_timestamp": 1689832541,
//     "job_onet_job_zone": "3",
//     "job_onet_soc": "15113400",
//     "job_posted_at_datetime_utc": "2023-06-20T05:55:27.000Z",
//     "job_posted_at_timestamp": 1687240527,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": true,
//       "degree_preferred": true,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": 60,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "DL",
//     "job_title": "React Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotpNzydbSWoAn9p_4ZzzuYSF4pylAZ07N26wi&s=0",
//     "employer_name": "Entiovi Technologies",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/senior-reactjs-developer-at-entiovi-technologies-3637028262",
//     "job_apply_quality_score": 0.5863,
//     "job_benefits": null,
//     "job_city": "Kolkata",
//     "job_country": "IN",
//     "job_description": "ReactJS/NodeJS DEVELOPER (Entiovi)

// Introduction

// We at Entiovi Technologies, provide digital transformation using new-age intelligent technologies for more than 5 years. We have clients located primarily in the US and Europe that are served by our Dedicated teams. This job is part of our expansion in India.

// Job Briefing

// As a part of this role, you will :

// ⦁ Work with development teams and product managers to ideate software solutions

// ⦁ Build front-end application using ReactJS

// ⦁ Develop and manage well-functioning databases and applications

// ⦁ Troubleshoot, debug and upgrade software

// ⦁ Build features and applications with a mobile responsive design

// ⦁ Provide design feedback to our design team

// ⦁ Be responsible for end-to-end development and support cycle

// ⦁ Follow the best software development practices

// ⦁ Provide client-facing presentations and support as and when needed

// To be successful in this role, you must have,

// ⦁ Strong knowledge and at least 3 years of experience in JavaScript and any of the JavaScript frameworks (React.js/Node.js/Vue js) - (React.js and Node.js are preferred)

// ⦁ Frontend/Backend Application development experience with Node.js(preferred)

// ⦁ Have worked on at least 3 live projects each with a minimum project duration of 6 months.

// ⦁ Familiarity with databases - Postgres / MongoDB, No- SQL Database

// ⦁ Brief knowledge of HTML/CSS, bootstrap and development knowledge of responsive screens

// ⦁ Good communication skills and interpersonal relationship skills

// ⦁ Strong problem-solving and analytical skills

// ⦁ Experience of working with latest design patterns

// ⦁ Passion for clean design and library/modular grade coding

// ⦁ Ability to work in agile methodologies in a distributed team environment.

// ⦁ Experience working with Git

// Experience level,

// ⦁ Mid-Senior level

// It would be nice if yo...(truncated to the first 10000 characters)
// Object {
// "data": Array [
//   Object {
//     "employer_company_type": "Computer Services",
//     "employer_logo": "https://www.tcs.com/content/dam/tcs/images/logo/tatalogo-white2x.png",
//     "employer_name": "Tata Consultancy Services",
//     "employer_website": "http://www.tcs.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/python-developer-at-tata-consultancy-services-3637034291",
//     "job_apply_quality_score": 0.5723,
//     "job_benefits": null,
//     "job_city": "Chennai",
//     "job_country": "IN",
//     "job_description": "POSITION: Python Developer

// JOB LOCATION: Chennai

// EXPERIENCE REQUIREMENT :4-7 yrs

// The candidate should have the below skills.

// Good knowledge of Object-Oriented programming

// Knowledge of third-party APIs using in Python

// Knowledge of Python data structures

// Knowledge of Python database operations (MySQL)

// Knowledge of Python ascii and binary file operations

// Knowledge of Python web framework (Django)

// Knowledge of html/ CSS/ JavaScript /JSON

// Familiar with Linux(ubuntu) command-line-interface

// Also, below are the desired skills.

// knowledge of OpenStack, Apache, Git, Jenkins, Docker, Kubernetes, Ansible, Cloud Computing

// knowledge of shell scripting

// knowledge of Agile Software Development methodology, processes, and practices.

// knowledge of RESTful service architectures

// Experience with developing and deploying software in a distributed/cloud computing environment

// knowledge of C/C++, Java, C#, SQL",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=rWdWUe97j4IAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "rWdWUe97j4IAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 13.08268,
//     "job_longitude": 80.27072,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_naics_code": "541512",
//     "job_naics_name": "Computer Systems Design Services",
//     "job_offer_expiration_datetime_utc": "2023-07-21T07:02:07.000Z",
//     "job_offer_expiration_timestamp": 1689922927,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T07:02:07.000Z",
//     "job_posted_at_timestamp": 1687330927,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": false,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": null,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_title": "Python Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcFkfCpoxqkuqtolRTOFA2Nnf-YxHJ-jWTpaZz&s=0",
//     "employer_name": "Techster IT Services",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/python-developer-at-techster-it-services-3637034577",
//     "job_apply_quality_score": 0.5817,
//     "job_benefits": null,
//     "job_city": "Madurai",
//     "job_country": "IN",
//     "job_description": "1) Candidates with minimum 3-5 years of experience are preferred.

// 2) Smart, talented and hands-on experience in Python / PostgresSQL, HTML, CSS

// 3) Experience in JSON, web services, and RestAPI is mandatory

// 4) Knowledge of AWS / GCP is a must.

// 5) Knowledge of Micro Services, Docker, Gitlab and CD / CI pipeline.",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=nT6_TWmRy20AAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "nT6_TWmRy20AAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 9.9252,
//     "job_longitude": 78.119774,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": "2023-07-21T19:39:51.000Z",
//     "job_offer_expiration_timestamp": 1689968391,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T19:39:51.000Z",
//     "job_posted_at_timestamp": 1687376391,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": false,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": true,
//       "no_experience_required": false,
//       "required_experience_in_months": 36,
//     },
//     "job_required_skills": Array [
//       "Python (Programming Language)",
//       "Google Cloud Platform (GCP)",
//       "Microservices",
//       "Amazon Web Services (AWS)",
//       "Gitlab",
//       "CI",
//       "Continuous Integration (CI)",
//       "Docker Products",
//       "HTML",
//       "Cascading Style Sheets (CSS)",
//     ],
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_title": "Python Developer",
//   },
//   Object {
//     "employer_company_type": "Finance",
//     "employer_logo": "https://logos-world.net/wp-content/uploads/2021/02/BNP-Paribas-Logo.png",
//     "employer_name": "BNP Paribas",
//     "employer_website": "https://www.bnpparibas.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://group.bnpparibas/en/careers/job-offer/actimize-plsql-python-developer",
//     "job_apply_quality_score": 0.882,
//     "job_benefits": null,
//     "job_city": "Chennai",
//     "job_country": "IN",
//     "job_description": "About BNP Paribas Group:

// Worldwide, BNP Paribas has a presence in 74 countries with more than 190,000 employees. It has key positions in its three main activities: Domestic Markets and International Financial Services (whose retail-banking networks and financial services are covered by Retail Banking & Services) and Corporate & Institutional Banking, which serves two client franchises: corporate clients and institutional investors. In Asia Pacific, BNP Paribas is one of the best-positioned international financial institutions with an uninterrupted presence since 1860. Currently with over 15,000 employees* and a presence in 14 markets, it provides clients with product and service solutions tailored to their specific needs, and continues to develop its franchise in the region.

// About BNP Paribas India Solutions:

// Established in 2005, BNP Paribas India Solutions is a wholly owned subsidiary of BNP Paribas Group, a leading bank in Europe with an international reach. With delivery centers located in Mumbai and Chennai, we are a 24x7 global delivery center. We partner various business lines of BNP Paribas such as Corporate and Institutional Banking, Wealth Management, Retail Banking through three verticals - Information Technology, Operations and Finance Shared Services.

// About Business line/Function :

// This role is with CIB IT- Regulatory Controls team. Regulatory controls IT team provides services to Compliance, Control and Legal functions within BNP Paribas CIB. The key stakeholders are spread across Europe and North America.        

// MCA, BE/BTech",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=y32XsvVkcRsAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "y32XsvVkcRsAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 13.08268,
//     "job_longitude": 80.27072,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_naics_code": "522110",
//     "job_naics_name": "Commercial Banking",
//     "job_offer_expiration_datetime_utc": null,
//     "job_offer_expiration_timestamp": null,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T00:00:00.000Z",
//     "job_posted_at_timestamp": 1687305600,
//     "job_posting_language": "en",
//     "job_publisher": "BNP Paribas",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": false,
//       "degree_mentioned": true,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": false,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": null,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_ti...(truncated to the first 10000 characters)
// Object {
// "data": Array [
//   Object {
//     "employer_company_type": "Computer Services",
//     "employer_logo": "https://www.tcs.com/content/dam/tcs/images/logo/tatalogo-white2x.png",
//     "employer_name": "Tata Consultancy Services",
//     "employer_website": "http://www.tcs.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/python-developer-at-tata-consultancy-services-3637034291",
//     "job_apply_quality_score": 0.5723,
//     "job_benefits": null,
//     "job_city": "Chennai",
//     "job_country": "IN",
//     "job_description": "POSITION: Python Developer

// JOB LOCATION: Chennai

// EXPERIENCE REQUIREMENT :4-7 yrs

// The candidate should have the below skills.

// Good knowledge of Object-Oriented programming

// Knowledge of third-party APIs using in Python

// Knowledge of Python data structures

// Knowledge of Python database operations (MySQL)

// Knowledge of Python ascii and binary file operations

// Knowledge of Python web framework (Django)

// Knowledge of html/ CSS/ JavaScript /JSON

// Familiar with Linux(ubuntu) command-line-interface

// Also, below are the desired skills.

// knowledge of OpenStack, Apache, Git, Jenkins, Docker, Kubernetes, Ansible, Cloud Computing

// knowledge of shell scripting

// knowledge of Agile Software Development methodology, processes, and practices.

// knowledge of RESTful service architectures

// Experience with developing and deploying software in a distributed/cloud computing environment

// knowledge of C/C++, Java, C#, SQL",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=rWdWUe97j4IAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "rWdWUe97j4IAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 13.08268,
//     "job_longitude": 80.27072,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_naics_code": "541512",
//     "job_naics_name": "Computer Systems Design Services",
//     "job_offer_expiration_datetime_utc": "2023-07-21T07:02:07.000Z",
//     "job_offer_expiration_timestamp": 1689922927,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T07:02:07.000Z",
//     "job_posted_at_timestamp": 1687330927,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": false,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": null,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_title": "Python Developer",
//   },
//   Object {
//     "employer_company_type": null,
//     "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcFkfCpoxqkuqtolRTOFA2Nnf-YxHJ-jWTpaZz&s=0",
//     "employer_name": "Techster IT Services",
//     "employer_website": null,
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://in.linkedin.com/jobs/view/python-developer-at-techster-it-services-3637034577",
//     "job_apply_quality_score": 0.5817,
//     "job_benefits": null,
//     "job_city": "Madurai",
//     "job_country": "IN",
//     "job_description": "1) Candidates with minimum 3-5 years of experience are preferred.

// 2) Smart, talented and hands-on experience in Python / PostgresSQL, HTML, CSS

// 3) Experience in JSON, web services, and RestAPI is mandatory

// 4) Knowledge of AWS / GCP is a must.

// 5) Knowledge of Micro Services, Docker, Gitlab and CD / CI pipeline.",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=nT6_TWmRy20AAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "nT6_TWmRy20AAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 9.9252,
//     "job_longitude": 78.119774,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_offer_expiration_datetime_utc": "2023-07-21T19:39:51.000Z",
//     "job_offer_expiration_timestamp": 1689968391,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T19:39:51.000Z",
//     "job_posted_at_timestamp": 1687376391,
//     "job_posting_language": "en",
//     "job_publisher": "LinkedIn",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": true,
//       "degree_mentioned": false,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": true,
//       "experience_preferred": true,
//       "no_experience_required": false,
//       "required_experience_in_months": 36,
//     },
//     "job_required_skills": Array [
//       "Python (Programming Language)",
//       "Google Cloud Platform (GCP)",
//       "Microservices",
//       "Amazon Web Services (AWS)",
//       "Gitlab",
//       "CI",
//       "Continuous Integration (CI)",
//       "Docker Products",
//       "HTML",
//       "Cascading Style Sheets (CSS)",
//     ],
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_title": "Python Developer",
//   },
//   Object {
//     "employer_company_type": "Finance",
//     "employer_logo": "https://logos-world.net/wp-content/uploads/2021/02/BNP-Paribas-Logo.png",
//     "employer_name": "BNP Paribas",
//     "employer_website": "https://www.bnpparibas.com",
//     "job_apply_is_direct": false,
//     "job_apply_link": "https://group.bnpparibas/en/careers/job-offer/actimize-plsql-python-developer",
//     "job_apply_quality_score": 0.882,
//     "job_benefits": null,
//     "job_city": "Chennai",
//     "job_country": "IN",
//     "job_description": "About BNP Paribas Group:

// Worldwide, BNP Paribas has a presence in 74 countries with more than 190,000 employees. It has key positions in its three main activities: Domestic Markets and International Financial Services (whose retail-banking networks and financial services are covered by Retail Banking & Services) and Corporate & Institutional Banking, which serves two client franchises: corporate clients and institutional investors. In Asia Pacific, BNP Paribas is one of the best-positioned international financial institutions with an uninterrupted presence since 1860. Currently with over 15,000 employees* and a presence in 14 markets, it provides clients with product and service solutions tailored to their specific needs, and continues to develop its franchise in the region.

// About BNP Paribas India Solutions:

// Established in 2005, BNP Paribas India Solutions is a wholly owned subsidiary of BNP Paribas Group, a leading bank in Europe with an international reach. With delivery centers located in Mumbai and Chennai, we are a 24x7 global delivery center. We partner various business lines of BNP Paribas such as Corporate and Institutional Banking, Wealth Management, Retail Banking through three verticals - Information Technology, Operations and Finance Shared Services.

// About Business line/Function :

// This role is with CIB IT- Regulatory Controls team. Regulatory controls IT team provides services to Compliance, Control and Legal functions within BNP Paribas CIB. The key stakeholders are spread across Europe and North America.        

// MCA, BE/BTech",
//     "job_employment_type": "FULLTIME",
//     "job_experience_in_place_of_education": false,
//     "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+india&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+india&htidocid=y32XsvVkcRsAAAAAAAAAAA%3D%3D",
//     "job_highlights": Object {},
//     "job_id": "y32XsvVkcRsAAAAAAAAAAA==",
//     "job_is_remote": false,
//     "job_job_title": null,
//     "job_latitude": 13.08268,
//     "job_longitude": 80.27072,
//     "job_max_salary": null,
//     "job_min_salary": null,
//     "job_naics_code": "522110",
//     "job_naics_name": "Commercial Banking",
//     "job_offer_expiration_datetime_utc": null,
//     "job_offer_expiration_timestamp": null,
//     "job_onet_job_zone": "4",
//     "job_onet_soc": "15113200",
//     "job_posted_at_datetime_utc": "2023-06-21T00:00:00.000Z",
//     "job_posted_at_timestamp": 1687305600,
//     "job_posting_language": "en",
//     "job_publisher": "BNP Paribas",
//     "job_required_education": Object {
//       "associates_degree": false,
//       "bachelors_degree": false,
//       "degree_mentioned": true,
//       "degree_preferred": false,
//       "high_school": false,
//       "postgraduate_degree": false,
//       "professional_certification": false,
//       "professional_certification_mentioned": false,
//     },
//     "job_required_experience": Object {
//       "experience_mentioned": false,
//       "experience_preferred": false,
//       "no_experience_required": false,
//       "required_experience_in_months": null,
//     },
//     "job_required_skills": null,
//     "job_salary_currency": null,
//     "job_salary_period": null,
//     "job_state": "TN",
//     "job_ti...(truncated to the first 10000 characters)