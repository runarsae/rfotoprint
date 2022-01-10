import styled from 'styled-components';

export const ImageWrapper = styled.div<{ backgroundColor?: string }>((props) => ({
    width: '100%',
    height: 'auto',
    backgroundColor: props.backgroundColor || props.theme.palette.inputBackground.light,
    padding: '12px',
    cursor: 'pointer'
}));

export const ImageDisplay = styled.img({
    display: 'block',
    width: '100%',
    height: '260px',
    objectFit: 'contain'
});

export const ImagePlaceholder = styled.div<{ color?: string }>((props) => ({
    display: 'block',
    fontWeight: 'normal',
    color: props.color || props.theme.palette.text.dark,
    letterSpacing: '0',
    textAlign: 'center'
}));
