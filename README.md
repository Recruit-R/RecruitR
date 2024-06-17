

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
This project was born out of a need to create, maintain, and easily utilize information related to recruiting candidates. One of the hardest parts of recruiting is figuring out how to manage the data that you get from candidates. RecruitR enables candidates to quickly create accounts with a QR code, and populate them with relevant information. Recruiters can then interact with these accounts by filtering and sorting them, along with all sorts of capabilities for rating and information recording.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Next][Next.js]][Next-url] \
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) \
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) \
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Architecture and Design
We used NextJS to build the front and back end. We use firebase for authentication, data storage, and email services. NextJS allows for more consistent development, and integrates really well with firebase technologies. \
<img src="./documentation/diagrams/general-recruitr-architecture.svg" />


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



USAGE EXAMPLES 
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
    - [x] resume parsing
    - [x] resume management
    - [ ] editable candidate email
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

See the [open issues](https://github.com/Recruit-R/RecruitR/issues) for a full list of proposed features (and known issues).

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