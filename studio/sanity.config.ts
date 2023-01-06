import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import deskStructure from './desk-structure';

export default defineConfig({
  name: 'default',
  title: 'Cybernetisk Selskab historie',

  projectId: '82t0q9qo',
  dataset: 'production',

  plugins: [deskTool({
    structure: deskStructure
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
