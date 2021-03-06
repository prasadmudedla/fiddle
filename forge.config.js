/* tslint:disable */

const path = require('path')
const packageJson = require('./package.json')

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

module.exports = {
  hooks: {
    generateAssets: require('./tools/generateAssets')
  },
  packagerConfig: {
    name: 'Electron Fiddle',
    executableName: 'electron-fiddle',
    asar: true,
    icon: path.resolve(__dirname, 'assets', 'icons', 'fiddle'),
    // TODO: FIXME?
    // ignore: [
    //   /^\/\.vscode\//,
    //   /^\/tools\//
    // ],
    appBundleId: 'com.electron.fiddle',
    appCategoryType: 'public.app-category.developer-tools',
    protocols: [{
      name: 'Electron Fiddle Launch Protocol',
      schemes: ['electron-fiddle']
    }],
    win32metadata: {
      CompanyName: 'Electron Community',
      OriginalFilename: 'Electron Fiddle',
    },
    osxSign: {
      identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)'
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: arch => {
        return {
          name: 'electron-fiddle',
          authors: 'Electron Community',
          exe: 'electron-fiddle.exe',
          iconUrl: 'https://raw.githubusercontent.com/electron/fiddle/0119f0ce697f5ff7dec4fe51f17620c78cfd488b/assets/icons/fiddle.ico',
          loadingGif: './assets/loading.gif',
          noMsi: true,
          remoteReleases: '',
          setupExe: `electron-fiddle-${version}-${arch}-setup.exe`,
          setupIcon: path.resolve(iconDir, 'fiddle.ico'),
          certificateFile: process.env.WINDOWS_CERTIFICATE_FILE,
          certificatePassword: process.env.WINDOWS_CERTIFICATE_PASSWORD
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {
        icon: {
          scalable: path.resolve(iconDir, 'fiddle.svg')
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux']
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'electron',
          name: 'fiddle'
        },
        prerelease: true
      }
    }
  ]
}
