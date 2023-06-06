import React, { createContext, useState } from "react";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import styles from "./PageContext.module.css";

export const PageSettingsContext = createContext();

export function PageSettingsProvider({ children }) {
  const [pageHeader, setPageHeader] = useState(true);
  const [pageFooter, setPageFooter] = useState(true);
  const [routeItems, setRouteItems] = useState([]);

  return (
    <PageSettingsContext.Provider value={{ setPageHeader, setPageFooter, setRouteItems }}>
        <div className={styles.PageWrapper}>
            { pageHeader && <Header />}
            <div className={styles.PageWrapper2}>
              <div className={styles.PageWrapper3}>
                <main className={styles.content}>
                  {children}
                </main>
              </div>
            </div>

            { pageFooter && <Footer />}
        </div>
    </PageSettingsContext.Provider>
  );
    
}