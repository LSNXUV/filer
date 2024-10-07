'use client'

import styles from "./index.module.scss";
import Sider from "@/components/Sider/Index";
import Content from "@/components/Content/Index";
import { FilesProvider } from "@/lib/Context/File";
import { LangProvider } from "@/lib/Context/Lang";
import { MessageProvider } from "@/lib/Context/Message";
import { ConfirmProvider } from "@/lib/Context/Confirm";
import { SingleInputProvide } from "@/lib/Context/SingleInput";

export default function Filer() {


  return (
    <div className={styles.home}>
      <LangProvider>
        <ConfirmProvider>
          <SingleInputProvide>
            <MessageProvider>
              <FilesProvider>
                  <Sider />
                  <Content />
              </FilesProvider>
            </MessageProvider>
          </SingleInputProvide>
        </ConfirmProvider>
      </LangProvider>
    </div>
  );
}
