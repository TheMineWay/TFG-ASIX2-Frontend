import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled, LinkedinFilled, ShareAltOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Layout, Row } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";
import shareWebsite, { canShare } from "../../services/share/ShareService";
import { Social } from "../mainPage/ourProfessionals/OurProfessionalsCardGrid";
import './Footer.css';

const { Footer: AntdFooter } = Layout;

const social: Social[] = [
    {
        id: 'instagram',
        icon: <InstagramOutlined />,
        link: 'https://www.instagram.com/',
    },
    {
        id: 'twitter',
        icon: <TwitterOutlined />,
        link: 'https://www.twitter.com',
    },
    {
        id: 'facebook',
        icon: <FacebookFilled />,
        link: 'https://www.facebook.com',
    },
    {
        id: 'youtube',
        icon: <YoutubeFilled />,
        link: 'https://www.youtube.com',
    },
    {
        id: 'linkedintwitter',
        icon: <LinkedinFilled />,
        link: 'https://www.linkedin.com',
    },
];

export default function Footer() {
    return (
        <AntdFooter
            style={{
                backgroundColor: '#001529'
            }}
        >
            <Row
                justify="center"
                gutter={[12,12]}
            >
                <Col
                    xs={24}
                    sm={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {
                        canShare() && (
                            <Button
                                icon={<ShareAltOutlined />}
                                type='ghost'
                                style={{
                                    color: 'white'
                                }}
                                onClick={() => shareWebsite()}
                            >
                                {t('footer.Share')}
                            </Button>
                        )
                    }
                </Col>
                <Col
                    xs={24}
                    sm={8}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            social.map((s) => (
                                <div
                                    key={s.id}
                                    className="footerSocial"
                                    onClick={() => {
                                        window.open(s.link, '_blank')?.focus();
                                    }}
                                >
                                    {s.icon}
                                </div>
                            ))
                        }
                    </div>
                </Col>
                <Col
                    xs={24}
                    sm={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Link
                        to={'/privacy'}
                        target='_blank'
                        style={{
                            color: 'white',
                        }}
                    >
                        {t('footer.Privacy')}
                    </Link>
                </Col>
                <Col
                    span={24}
                >
                    <Alert
                        message={t('footer.Edu')}
                        type='info'
                        showIcon
                        closable
                    />
                </Col>
            </Row>
        </AntdFooter>
    );
}