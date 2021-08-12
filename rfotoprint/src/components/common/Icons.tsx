interface IconProps {
    fill: string;
}

export const BoxIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill={props.fill}
        >
            <g>
                <rect fill="none" height="24" width="24" />
            </g>
            <g>
                <g>
                    <path d="M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z" />
                    <rect height="2" width="6" x="9" y="12" />
                </g>
            </g>
        </svg>
    );
};

export const DeleteIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill={props.fill}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
        </svg>
    );
};

export const EditIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill={props.fill}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
        </svg>
    );
};

export const LogoutIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill={props.fill}
        >
            <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
                <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
            </g>
        </svg>
    );
};

export const TagIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill={props.fill}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z" />
            <circle cx="6.5" cy="6.5" r="1.5" />
        </svg>
    );
};
