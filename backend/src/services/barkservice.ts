import { exec } from 'child_process'

export const generateAudio = (text: string, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const command = `python3 ./scripts/generate_audio.py "${text}" "${outputPath}"`
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        return reject(stderr)
      }
      resolve()
    })
  })
}
