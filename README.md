# Calendar Demo

It's a simple demo of how to render calendar events within a day. Overlapping events should have even width and rendered next to each others. For example, if a day has more than 3 events and only two of them are overlapping at the same time, then the width should be 50%, otherwise 33.33% and so on — the more events are overlapping, the less width each event should have. For the sake of simplicity, only one day will be rendered.

> Disclaimer:
> This project setup is based on the [HTML Tailwind starter](https://github.com/rebelchris/HTML-Tailwind-Starter)

## Installation

The installation is very easy run the install command.

```bash
npm install
```

Next up we can run the dev server:

```bash
npm run dev
```

And your website will start up.

**Note - make sure to install live-server globally as a dependancy or it will not work**

```bash
npm install -g live-server
```

## Modifying the project

You can then modify the `tailwind.config.js` for your own custom colors if needed
And modify the `index.html` inside the `src` directory.

## Read more

If you're interested to read more about this template.
Check out the article I wrote on [HTML Tailwind starter](https://daily-dev-tips.com/posts/plain-html-starter-with-tailwind-css/)
