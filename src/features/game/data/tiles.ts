import type { TileDefinition } from '../domain/entities/card';

import angularUrl from '../../../assets/svg-frames/angular.svg?url';
import astroUrl from '../../../assets/svg-frames/astro_dark.svg?url';
import djangoUrl from '../../../assets/svg-frames/django.svg?url';
import fastapiUrl from '../../../assets/svg-frames/fastapi.svg?url';
import flutterUrl from '../../../assets/svg-frames/flutter.svg?url';
import gatsbyUrl from '../../../assets/svg-frames/gatsby.svg?url';
import laravelUrl from '../../../assets/svg-frames/laravel.svg?url';
import nestjsUrl from '../../../assets/svg-frames/nestjs.svg?url';
import nextjsUrl from '../../../assets/svg-frames/nextjs.svg?url';
import qwikUrl from '../../../assets/svg-frames/qwik.svg?url';
import solidUrl from '../../../assets/svg-frames/solidjs.svg?url';
import vueUrl from '../../../assets/svg-frames/vue.svg?url';
import cUrl from '../../../assets/svg-lenguajes/c.svg?url';
import dartUrl from '../../../assets/svg-lenguajes/dart.svg?url';
import graphqlUrl from '../../../assets/svg-lenguajes/graphql.svg?url';
import haskellUrl from '../../../assets/svg-lenguajes/haskell.svg?url';
import javaUrl from '../../../assets/svg-lenguajes/java.svg?url';
import javascriptUrl from '../../../assets/svg-lenguajes/javascript.svg?url';
import kotlinUrl from '../../../assets/svg-lenguajes/kotlin.svg?url';
import pythonUrl from '../../../assets/svg-lenguajes/python.svg?url';
import rubyUrl from '../../../assets/svg-lenguajes/ruby.svg?url';
import rustUrl from '../../../assets/svg-lenguajes/rust_dark.svg?url';
import swiftUrl from '../../../assets/svg-lenguajes/swift.svg?url';
import typescriptUrl from '../../../assets/svg-lenguajes/typescript.svg?url';
import androidUrl from '../../../assets/svg-soft/android.svg?url';
import appleUrl from '../../../assets/svg-soft/apple_dark.svg?url';
import codesandboxUrl from '../../../assets/svg-soft/codesandbox-square.svg?url';
import copilotUrl from '../../../assets/svg-soft/copilot_dark.svg?url';
import discordUrl from '../../../assets/svg-soft/discord.svg?url';
import gitUrl from '../../../assets/svg-soft/git.svg?url';
import githubUrl from '../../../assets/svg-soft/github.svg?url';
import herokuUrl from '../../../assets/svg-soft/heroku.svg?url';
import homebrewUrl from '../../../assets/svg-soft/homebrew.svg?url';
import jetbrainsUrl from '../../../assets/svg-soft/jetbrains.svg?url';
import linuxUrl from '../../../assets/svg-soft/linux.svg?url';
import postmanUrl from '../../../assets/svg-soft/postman.svg?url';

export const tiles: readonly TileDefinition[] = [
  { id: 'python', categoryId: 'languages', label: 'Python', imageSrc: pythonUrl },
  { id: 'javascript', categoryId: 'languages', label: 'JavaScript', imageSrc: javascriptUrl },
  { id: 'swift', categoryId: 'languages', label: 'Swift', imageSrc: swiftUrl },
  { id: 'typescript', categoryId: 'languages', label: 'TypeScript', imageSrc: typescriptUrl },
  { id: 'java', categoryId: 'languages', label: 'Java', imageSrc: javaUrl },
  { id: 'dart', categoryId: 'languages', label: 'Dart', imageSrc: dartUrl },
  { id: 'kotlin', categoryId: 'languages', label: 'Kotlin', imageSrc: kotlinUrl },
  { id: 'graphql', categoryId: 'languages', label: 'GraphQL', imageSrc: graphqlUrl },
  { id: 'c', categoryId: 'languages', label: 'C', imageSrc: cUrl },
  { id: 'ruby', categoryId: 'languages', label: 'Ruby', imageSrc: rubyUrl },
  { id: 'haskell', categoryId: 'languages', label: 'Haskell', imageSrc: haskellUrl },
  { id: 'rust', categoryId: 'languages', label: 'Rust', imageSrc: rustUrl },

  { id: 'angular', categoryId: 'frameworks', label: 'Angular', imageSrc: angularUrl },
  { id: 'astro', categoryId: 'frameworks', label: 'Astro', imageSrc: astroUrl },
  { id: 'django', categoryId: 'frameworks', label: 'Django', imageSrc: djangoUrl },
  { id: 'fastapi', categoryId: 'frameworks', label: 'FastAPI', imageSrc: fastapiUrl },
  { id: 'flutter', categoryId: 'frameworks', label: 'Flutter', imageSrc: flutterUrl },
  { id: 'gatsby', categoryId: 'frameworks', label: 'Gatsby', imageSrc: gatsbyUrl },
  { id: 'laravel', categoryId: 'frameworks', label: 'Laravel', imageSrc: laravelUrl },
  { id: 'nextjs', categoryId: 'frameworks', label: 'Next.js', imageSrc: nextjsUrl },
  { id: 'nestjs', categoryId: 'frameworks', label: 'NestJS', imageSrc: nestjsUrl },
  { id: 'vue', categoryId: 'frameworks', label: 'Vue', imageSrc: vueUrl },
  { id: 'qwik', categoryId: 'frameworks', label: 'Qwik', imageSrc: qwikUrl },
  { id: 'solid', categoryId: 'frameworks', label: 'Solid', imageSrc: solidUrl },

  { id: 'android', categoryId: 'tools', label: 'Android', imageSrc: androidUrl },
  { id: 'apple', categoryId: 'tools', label: 'Apple', imageSrc: appleUrl },
  { id: 'codesandbox', categoryId: 'tools', label: 'CodeSandbox', imageSrc: codesandboxUrl },
  { id: 'copilot', categoryId: 'tools', label: 'Copilot', imageSrc: copilotUrl },
  { id: 'discord', categoryId: 'tools', label: 'Discord', imageSrc: discordUrl },
  { id: 'git', categoryId: 'tools', label: 'Git', imageSrc: gitUrl },
  { id: 'github', categoryId: 'tools', label: 'GitHub', imageSrc: githubUrl },
  { id: 'heroku', categoryId: 'tools', label: 'Heroku', imageSrc: herokuUrl },
  { id: 'homebrew', categoryId: 'tools', label: 'Homebrew', imageSrc: homebrewUrl },
  { id: 'jetbrains', categoryId: 'tools', label: 'JetBrains', imageSrc: jetbrainsUrl },
  { id: 'linux', categoryId: 'tools', label: 'Linux', imageSrc: linuxUrl },
  { id: 'postman', categoryId: 'tools', label: 'Postman', imageSrc: postmanUrl },
] as const;
