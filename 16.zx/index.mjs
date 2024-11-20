//import 'zx/globals'

usePowerShell()

$.verbose=true

await $`echo hello world`
await $`TASKLIST`
await $`echo Done.`
