<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/blesten/recipe-app">
    <img src="assets/images-temp/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Cook It</h3>

  <p align="center">
    An awesome recipe application based on mobile
    <br />
    <a href="https://github.com/blesten/recipe-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://youtu.be/l8LGt690G04">View Demo</a>
    · -->
    <a href="https://github.com/blesten/recipe-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/blesten/recipe-app/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Welcome to the **Cook It** Github repository! Here, you'll find the source code for our sleek and sophisticated recipe application. Built with modern technologies and a focus on user experience, our application aims to provide users with an effortless recipe searching experience.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [React Native](https://reactnative.dev/)
* [Cloudinary](https://cloudinary.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Firebase](https://firebase.google.com/)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have your device emulator, React Native, and package manager (either npm or yarn) installed

>**FYI**: This project uses **yarn** as the server package manager, but you're free to use **npm** too.

### Installation

Below steps will guide you through the local installation process of this application

1. Clone the repo
   ```
   git clone https://github.com/blesten/recipe-app.git
   ```
2. Complete the constant.ts variable at /utils directory
Rename constant.example.ts file at ```/utils``` directory become ```constant.ts```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What to Fill | Example Value |
    | :---: | :---: | :---: |
    | FB_API_KEY | Your Firebase API key | Stdsdddd |
    | FB_AUTH_DOMAIN | Your Firebase auth domain | testapp-12345ssxyz.firebaseapp.com |
    | FB_PROJECT_ID | Your Firebase project ID | testapp-12345-abc |
    | FB_STORAGE_BUCKET | Your Firebase storage bucket | testapp-1lklkf.acb |
    | FB_MESSAGING_SENDER_ID | Your Firebase messaging sender ID | 123982389132 |
    | FB_APP_ID | Your Firebase app ID | 2:344342:web:jfsdlfjdsfabc123 |
    | CLOUDINARY_CLOUD_NAME | Your Cloudinary cloud name | abc1234 |
    | CLOUDINARY_USER_PRESET | Your Cloudinary preset ID to store user avatar | 123abc |
    | CLOUDINARY_DISH_PRESET | Your Cloudinary preset ID to store dish image | 123abc |
3. Open your terminal and ```cd``` to the root directory, then run ```yarn install``` to install all the application dependencies
4. After installing the dependencies, make sure you have your device emulator ready, then run ```yarn start``` at the terminal to start the application

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanleyclaudius)

Project Link: [https://github.com/blesten/recipe-app](https://github.com/blesten/recipe-app)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/blesten/recipe-app.svg?style=for-the-badge
[forks-url]: https://github.com/blesten/recipe-app/network/members
[stars-shield]: https://img.shields.io/github/stars/blesten/recipe-app.svg?style=for-the-badge
[stars-url]: https://github.com/blesten/recipe-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/blesten/recipe-app.svg?style=for-the-badge
[issues-url]: https://github.com/blesten/recipe-app/issues
[license-shield]: https://img.shields.io/github/license/blesten/recipe-app.svg?style=for-the-badge
[license-url]: https://github.com/blesten/recipe-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanleyclaudius