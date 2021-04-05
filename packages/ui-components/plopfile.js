module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{pascalCase name}}.tsx',
        templateFile:
          'plop-templates/Component/Component.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{pascalCase name}}.test.tsx',
        templateFile:
          'plop-templates/Component/Component.test.js.hbs'
      },
      {
        type: 'add',
        path:
          'src/components/{{kebabCase name}}/{{pascalCase name}}.style.tsx',
        templateFile:
          'plop-templates/Component/Component.styled.js.hbs'
      },
      {
        type: 'add',
        path:
          'src/components/{{kebabCase name}}/{{pascalCase name}}.stories.mdx',
        templateFile:
          'plop-templates/Component/Component.story.js.hbs'
      }
    ]
  })
}
