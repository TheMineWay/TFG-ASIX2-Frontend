import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled, LinkedinFilled } from "@ant-design/icons";
import { Layout } from "antd";
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
        icon: <TwitterOutlined/>,
        link: 'https://www.twitter.com',
    },
    {
        id: 'facebook',
        icon: <FacebookFilled/>,
        link: 'https://www.facebook.com',
    },
    {
        id: 'youtube',
        icon: <YoutubeFilled/>,
        link: 'https://www.youtube.com',
    },
    {
        id: 'linkedintwitter',
        icon: <LinkedinFilled/>,
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
        </AntdFooter>
    );
}