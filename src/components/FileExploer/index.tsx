'use client'

import styles from "./index.module.scss";
import Sider from "@/components/Sider";
import Content from "@/components/Content";
import Context from "@/lib/Context";

export default function Filer() {

  return (
    <div className={styles.home}>
      <Context>
        <Sider />
        <Content />
      </Context>
    </div>
  );
}
