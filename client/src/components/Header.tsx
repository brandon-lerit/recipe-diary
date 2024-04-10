import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowUpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={80} style={{ width: "100%"}}>
            <Container className={classes.header} style={{ width: "100%", marginLeft: "0" }}>
                <h1 style={{width: "50%"}}>Recipe Diary</h1>
                <Group spacing={"md"} className={classes.links} style={{width: "100%"}}>
                    {items}
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size='sm'
                />
            </Container>
        </Header>
    );
}
