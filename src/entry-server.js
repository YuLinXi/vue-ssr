import { createApp } from './app'

export default async context => {
  try {
    const { app, router, store } = createApp();
    const meta = app.$meta();
    router.push(context.url);
    context.meta = meta;
    await new Promise(router.onReady.bind(router));
    context.rendered = () => {
      context.state = store.state;
    }
    return app;
  } catch (err) {
    throw err;
  }
}
