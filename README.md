

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/thedeafone/repo_name">
    <img src="resources/assets/logo-v2-w.png" alt="Logo" width="80" height="80" style="border-radius:20px">
  </a>

<h3 align="center">RecruitR</h3>

  <p align="center">
    An intuitive, mobile-first webapp for all the difficult to manage recruiting tasks.
    <br />
    <!-- <a href="https://github.com/thedeafone/repo_name"><strong>Explore the docs »</strong></a>
    <br /> -->
    <!-- <br />
    <a href="https://github.com/thedeafone/repo_name">View Demo</a>
    ·
    <a href="https://github.com/thedeafone/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/thedeafone/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#origin">Origin</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#architecture-and-design">Architecture and Design</a></li>
        <ul>
        <li><a href="#general-architecture">General Architecture</a></li>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->
### Origin
This project was born out of a need to create, maintain, and easily utilize information related to recruiting candidates. One of the hardest parts of recruiting is figuring out how to manage the data that you get from candidates. RecruitR enables candidates to easily create accounts with a QR code, and populate them with relevant information. Recruiters can then interact with these accounts by filtering and sorting them, along with all sorts of capabilities for rating and information recording.

#### Example User Story
Matt, a student at the University of Pittsburgh, is looking to get an internship for the upcoming summer. He's perusing different company booths at a career fair, and notices PPG, a materials manufacturing company. He gets in line, and sees he can upload his information through the RecruitR app. He scans the available QR code at the PPG booth and makes an account using google OAuth. As he's waiting in line, he quickly fills out a bit of his experience, and academic info. 

Bryan, a recruiter at 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Next][Next.js]][Next-url] \
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) \
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=fff)](#) \
![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss) \
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) \
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Architecture and Design
### General Architecture
We use NextJS to build the front and back end. We use firebase for authentication, data storage, and email services. NextJS allows for more consistent development, and integrates really well with firebase technologies. \
<img src="./documentation/diagrams/general-recruitr-architecture.svg" />
<br />
The main elements of RecruitRs architecture are:
- NextJS Frontend and Backend
- Firebase authentication for user management
- Firestore database
- Firestore email services through the firestore-send-email extension
- A flask api for resume parsing, running on GCR (see more at https://github.com/Recruit-R/recruitr-resume-parser)


### Front and Back End
We tried to offload much of the stereotypical CRUD work onto the front-end using [firestore security rules](https://firebase.google.com/docs/firestore/security/get-started). This means that the front-end could be the main focus of our development efforts. We use the backend for any security-related requests (e.g. whitelist requests) and email requests.

### Firestore Database
Firestore is a no-SQL solution for data management, which was useful as we explored different data architectures. Additionally, it provides real-time updates and broadcasting, meaning that its only a few extra lines of code to update the UI when a new piece of data is added.

There are four collections for our data:
1. events - the set of past and future events
2. mail - various email requests, which include email messages, success states, and recipients.
3. users - the set of users all users
4. whitelist - the set of whitelisted recruiters or coordinators

While the data throughout these collections tends to be consistent, the exception is the users collection.

Users in this collection are partitioned by their role. Recruiters and coordinators have the same information such as email, name, and role; However, candidates will have varying data attributes, most notably the feedback attribute, which varies based on recruiter feedback.

### Authorization and Authentication
A large part of why we use firebase is for its robust security features. We authenticate using firebase's email and oAuth capabilities. We can then use firebase-provided authentication tokens to directly query firestore for data from the frontend. By setting up firestore security rules, users are validated and filtered by their given roles.

Beyond using roles for just data request validation, we also use them to manage where in the app a given user has access to. We do this through [NextJS's middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware), which is deployed "at the edge." This enables really quick role validation and means we can redirect the user quickly without having to worry about access policies on the client-side.



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* A [firebase project](https://firebase.google.com/) 

### Installation and Running

1. Clone the repo
   ```sh
   git clone https://github.com/Recruit-R/RecruitR.git
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Install [firebase tools](https://www.npmjs.com/package/firebase-tools)
   ```sh
   npm i firebase-tools
   ```
4. Initialize and connect firebase project
    ```sh
    firebase init
    ```
5. Initialize Emulators (Optional)
    run emulators with
    ```sh
    firebase init emulators
    ```
6. Initialize a local version or setup the cloud version of the [recruitr-resume-parser api](https://github.com/Recruit-R/recruitr-resume-parser)

7. Fill out the [environment variables file](./.env.example)

8. When using the emulators, start by running the following:
    ```sh
    npm run emulators
    ```
9. Run the app
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Usage
You can access the production version of the app at https://recruitr-dun.vercel.app/auth/login

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- [x] authorization/authentication
    - [x] login
    - [x] signup
    - [x] password reset
    - [x] refresh
- [x] Candidate homepage
    - [x] editable info
    - [x] resume parsing
    - [x] resume management
- [x] Recruiter dashboard
    - [x] candidate feedback
        - [x] candidate summary
        - [x] automatic saving
        - [x] delete capability
        - [x] feedback
        - [ ] configurable feedback
    - [x] candidate datatable
    - [x] live candidate updating
- [x] Recruiter Profile
    - [ ] editable recruiter email
- [x] Recruiter management by coordinator
    - [x] CRUD for recruiters
    - [x] email api
- [x] Event management
    - [x] CRUD for events
    - [x] creating qr code for event
    - [x] connecting event to profiles
- [x] hosting with vercel
- [ ] testing

See the [open issues](https://github.com/Recruit-R/RecruitR/issues) for a a more comprehensive list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE.txt](LICENSE.txt) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Keegan Woodburn - keegan.woodburn@gmail.com

Project Link: [https://github.com/thedeafone/repo_name](https://github.com/thedeafone/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

[Caleb Frey](https://github.com/freycp20)\
[Ava Hatfield](https://github.com/avaHatfield)\
[Keegan Woodburn](https://github.com/TheDeafOne)\
[Noah Yuen](https://github.com/NoYuen)\
[PPG](https://www.ppg.com/en-US)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/thedeafone/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/thedeafone/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thedeafone/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/thedeafone/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/thedeafone/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/thedeafone/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/thedeafone/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/thedeafone/repo_name/issues
[license-shield]: https://img.shields.io/github/license/thedeafone/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/thedeafone/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Firebase-url]: https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34