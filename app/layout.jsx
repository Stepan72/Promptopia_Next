// import "@styles/global.css";
import "./../styles/globals.css";
import { Nav, Provider } from "@components";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
