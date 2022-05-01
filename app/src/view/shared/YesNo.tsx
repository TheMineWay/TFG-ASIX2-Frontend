import { useTranslation } from 'react-i18next';

export default function YesNo(props: { children: boolean }) {
  const { t, i18n } = useTranslation();

  return (
    <>{t(`common.other.${props.children ? 'Yes' : 'No'}`)}</>
  );
}
