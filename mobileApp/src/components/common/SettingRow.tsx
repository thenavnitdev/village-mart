import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme';
import Divider from './Divider';

interface SettingRowProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
  showDivider?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  badge?: string;
  textColor?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightComponent,
  showArrow = false,
  showDivider = true,
  switchValue,
  onSwitchChange,
  badge,
  textColor,
}) => {
  const { theme } = useTheme();
  
  const content = (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, textColor && { color: textColor }]}>{title}</Text>
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {rightComponent}
        {switchValue !== undefined && onSwitchChange !== undefined && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
            thumbColor={theme.colors.textLight}
            ios_backgroundColor="#E5E7EB"
          />
        )}
        {showArrow && !rightComponent && switchValue === undefined && (
          <Text style={styles.arrow}>›</Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
        {showDivider && <Divider />}
      </>
    );
  }

  return (
    <>
      {content}
      {showDivider && <Divider />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background.light,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: colors.text.muted,
    marginLeft: 8,
  },
});

export default SettingRow;

