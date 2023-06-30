import React, { FC, useRef } from "react";
import styles from "./StatHeader.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Space,
  Typography,
  Input,
  Tooltip,
  InputRef,
  message,
  Popover,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import { QUESTION_EDIT_PATHNAME } from "../../../router";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import QRCode from "qrcode.react";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();

  const urlInputRef = useRef<InputRef>(null);

  // Copy survey link
  const copy = () => {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select();
    document.execCommand("copy");
    message.success("拷贝成功");
  };

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null;
    const url = `https://mysurvey.wwwyxxx.uk/question/${id}`;

    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );
    return (
      <Space>
        <Input value={url} ref={urlInputRef} />
        <Tooltip title="复制">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover placement="bottom" content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => nav(`${QUESTION_EDIT_PATHNAME}/${id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
