import { useState } from 'react';
import { scroller } from 'react-scroll';
import styled, { useTheme } from 'styled-components';
import Typography from '../../../../common/Typography';

const Button = styled.button({
    display: 'block',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '8px',
    cursor: 'pointer',
    userSelect: 'none'
});

interface Props {
    section: string;
}

function NavigationItem(props: Props) {
    const theme = useTheme();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Button
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={() => {
                scroller.scrollTo(props.section.valueOf(), {
                    duration: 1000,
                    smooth: 'easeInOutQuad'
                });
            }}
        >
            <Typography
                variant="body2"
                color={isHovering ? theme.palette.primary.main : theme.palette.common.black}
            >
                {props.section}
            </Typography>
        </Button>
    );
}

export default NavigationItem;
