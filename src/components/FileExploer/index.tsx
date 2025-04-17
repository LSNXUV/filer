'use client'

import styles from "./index.module.scss";
import Sider from "@/components/Sider";
import Content from "@/components/Content";
import Context from "@/lib/Context";
import Footer from "../Footer";

export default function Filer() {

  return (
    <div className={styles.home}>
      <Context>
        <div className={styles.center}>
          <Sider />
          <Content />
        </div>
        <Footer />
      </Context>
    </div>
  );
}
