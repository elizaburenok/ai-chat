import React from 'react';
import { Cell } from '../Cell';
import { Widget } from '../Widget';
import './UserInfoWidget.css';

export interface UserInfoWidgetData {
  name: string;
  accessibilityType: string;
  business: string;
  taxationSystem: string;
}

const DEFAULT_USER_INFO: UserInfoWidgetData = {
  name: 'Ольга Семёнова',
  accessibilityType: 'Обычный',
  business: 'ИП',
  taxationSystem: 'УСН',
};

export interface UserInfoWidgetProps {
  /** Override displayed user data. Omit to use default mock. */
  userInfo?: UserInfoWidgetData;
  /** Optional class name for the widget root */
  className?: string;
}

export const UserInfoWidget: React.FC<UserInfoWidgetProps> = ({
  userInfo = DEFAULT_USER_INFO,
  className,
}) => (
  <Widget title="Пользователь" className={['user-info-widget', className].filter(Boolean).join(' ')}>
    <Cell size="M" variant="default" subtitle="Имя">
      {userInfo.name}
    </Cell>
    <Cell size="M" variant="default" subtitle="Тип доступности">
      {userInfo.accessibilityType}
    </Cell>
    <Cell size="M" variant="default" subtitle="Бизнес">
      {userInfo.business}
    </Cell>
    <Cell size="M" variant="default" subtitle="Система налогообложения">
      {userInfo.taxationSystem}
    </Cell>
  </Widget>
);

export default UserInfoWidget;
