import { useState } from 'react';
import { ITreeMenu, CanAccess, useMenu } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { Sider, ThemedTitleV2 } from '@refinedev/antd';
import { Layout as AntdLayout, Menu, Grid, theme, Button } from 'antd';
import { UnorderedListOutlined, RightOutlined, LeftOutlined, RadarChartOutlined } from '@ant-design/icons';
import { antLayoutSider, antLayoutSiderMobile } from './styles';
import { nanoid } from 'nanoid';

const { useToken } = theme;
const siderWidth = 320;

const CustomSider: typeof Sider = () => {
    const { token } = useToken();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const { SubMenu } = Menu;

    const breakpoint = Grid.useBreakpoint();

    const isMobile = typeof breakpoint.lg === 'undefined' ? false : !breakpoint.lg;

    const renderTreeView = (tree: ITreeMenu[], theSelectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { name, children, meta, key, list } = item;

            const icon = meta?.icon;
            const label = meta?.label ?? name;
            const parent = meta?.parent;
            const route = typeof list === 'string' ? list : typeof list !== 'function' ? list?.path : key;

            if (children.length > 0) {
                return (
                    <SubMenu key={nanoid()} icon={icon ?? <UnorderedListOutlined />} title={label}>
                        {renderTreeView(children, theSelectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === theSelectedKey;
            const isRoute = !(parent !== undefined && children.length === 0);
            return (
                <CanAccess key={nanoid()} resource={name.toLowerCase()} action="list" params={{ resource: item }}>
                    <Menu.Item
                        key={route}
                        style={{
                            textTransform: 'capitalize',
                        }}
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                    >
                        {route ? <Link to={route || '/'}>{label}</Link> : label}
                        {!collapsed && isSelected && <div className="ant-menu-tree-arrow" />}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems, selectedKey);

    const siderStyle = isMobile ? antLayoutSiderMobile : antLayoutSider;

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(isCollapsed: boolean): void => setCollapsed(isCollapsed)}
            style={{
                ...siderStyle,
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
            }}
            trigger={
                !isMobile && (
                    <Button
                        type="text"
                        style={{
                            borderRadius: 0,
                            height: '100%',
                            width: '100%',
                            backgroundColor: token.colorBgElevated,
                        }}
                    >
                        {collapsed ? (
                            <RightOutlined
                                style={{
                                    color: token.colorPrimary,
                                }}
                            />
                        ) : (
                            <LeftOutlined
                                style={{
                                    color: token.colorPrimary,
                                }}
                            />
                        )}
                    </Button>
                )
            }
            width={siderWidth}
        >
            <div
                style={{
                    width: collapsed ? '80px' : `${siderWidth.toString()}px`,
                    padding: collapsed ? '0' : '0 16px',
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    alignItems: 'center',
                    height: '64px',
                    backgroundColor: token.colorBgElevated,
                    fontSize: '14px',
                }}
            >
                <ThemedTitleV2 collapsed={collapsed} icon={<RadarChartOutlined className="text-[1.5rem]" />} text="SmartBet" />
            </div>
            <Menu
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={[selectedKey]}
                mode="inline"
                style={{
                    marginTop: '8px',
                    border: 'none',
                }}
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {items}
            </Menu>
        </AntdLayout.Sider>
    );
};

export default CustomSider;
