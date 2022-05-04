// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
// ^^ This does not work.

// https://javascript.plainenglish.io/how-to-get-typescript-type-completion-by-defining-process-env-types-6a5869174f57
// ^^ This works. God knows why.
declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
  }
}
