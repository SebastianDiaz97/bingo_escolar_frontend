import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // server:{
  //   allowedHosts:[
  //     'gxeunj-ip-186-189-111-165.tunnelmole.net'
  //   ]
  // }
})
