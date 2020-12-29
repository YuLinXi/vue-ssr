import { createApp } from './app'

export default async context => {
  try {
    const { app, router } = createApp();
    const meta = app.$meta();
    router.push(context.url);
    context.meta = meta;
    await new Promise(router.onReady.bind(router));
    return app;
  } catch (err) {
    throw err;
  }
}
