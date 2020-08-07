# React-Typescript Boilerplate

React-typescript is a boilerplate code to setup react project with typescript template.

- Dexie.js - Used to store data in indexedDB
- Material-UI
- Lingui.JS-Locales support [en, gu, hi]
- Storybook with typescript support.

## Setup

    1. Clone Project.
    ```
    $ git clone git@github.com:seerviashish/react-typescript.git
    ```

    2. Run yarn to install dependancy.
    ```
    $ yarn
    ```

    3. Run yarn build-lingui to extract and compile messages.json for locales.
    ```
    $ yarn build-lingui
    ```

    4. To start project.
    ```
    $ yarn start
    ```

    5. To build project.
    ```
    $ yarn build
    ```

    6. To test project.
    ```
    $ yarn test
    ```

    7. To start storybook.
    ```
    $ yarn storybook
    ```

    8. To build storybook.
    ```
    $ yarn build-storybook
    ```

    Note: After making file changes if you run yarn commit command it will give you command line utility for commit.

        1. Add all files to stage
        ```
        $ git add .
        ```
        2. Run yarn commit
        ```
        $ yarn commit
        ```
    9. To Analyze build soruce files.
    ```
    $ yarn analyze
    ```

## Issues

    - Lingui support is not working in codesandbox
