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
    const { width } = useWindowDimensions();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <>
            {props.variant == 'button' ? (
                <Button
                    variant="outlined"
                    onClick={() => {
                        scroller.scrollTo(props.section.valueOf(), {
                            duration: 1000,
                            smooth: 'easeInOutQuad'
                        });

                        if (props.onClick) {
                            props.onClick();
                        }
                    }}
                >
                    {props.section}
                </Button>
            ) : (
                <TextLink
                    onMouseOver={() => setIsHovering(true)}
                    onMouseOut={() => setIsHovering(false)}
                    onClick={() => {
                        scroller.scrollTo(props.section.valueOf(), {
                            duration: 1000,
                            smooth: 'easeInOutQuad'
                        });

                        if (props.onClick) {
                            props.onClick();
                        }
                    }}
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
