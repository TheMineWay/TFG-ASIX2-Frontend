import { t } from "i18next";

export default function YesNo(props: { children: boolean }) {
  return (
    <>{t(`common.other.${props.children ? 'Yes' : 'No'}`)}</>
  );
}
