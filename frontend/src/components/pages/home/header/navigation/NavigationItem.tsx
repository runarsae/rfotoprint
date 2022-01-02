import { useState } from 'react';
import { scroller } from 'react-scroll';
import styled, { useTheme } from 'styled-components';
import useWindowDimensions from '../../../../../util/windowDimensions';
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';

const TextLink = styled.button({
    display: 'block',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '9px',
    cursor: 'pointer',
    userSelect: 'none'
});

interface Props {
    section: string;
    variant?: 'text' | 'button';
    color?: 'light' | 'dark';
    onClick?: () => void;
}

function NavigationItem(props: Props) {
    const theme = useTheme();
    const { width, height } = useWindowDimensions();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const scrollToSection = () => {
        const root = document.getElementById('root');
        const section = document.getElementsByName(props.section.valueOf())[0];

        if (root && section) {
            scroller.scrollTo(props.section.valueOf(), {
                duration: 1000,
                smooth: 'easeInOutQuad',
                ...(section.getBoundingClientRect().top + height > root.scrollHeight && {
                    offset: -(height - section.clientHeight)
                })
            });
        }

        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <>
            {props.variant == 'button' ? (
                <Button variant="outlined" onClick={scrollToSection}>
                    {props.section}
                </Button>
            ) : (
                <TextLink
                    onMouseOver={() => setIsHovering(true)}
                    onMouseOut={() => setIsHovering(false)}
                    onClick={scrollToSection}
                >
                    <Typography
                        variant={width >= theme.breakpoints.lg ? 'body2' : 'button'}
                        fontSize={width >= theme.breakpoints.lg ? undefined : '20px'}
                        color={
                            isHovering
                                ? theme.palette.primary.main
                                : props.color == 'light'
                                ? theme.palette.common.white
                                : theme.palette.common.black
                        }
                    >
                        {props.section}
                    </Typography>
                </TextLink>
            )}
        </>
    );
}

export default NavigationItem;
