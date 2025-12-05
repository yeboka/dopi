declare module "*.svg?react" {
    import * as React from "react"

    const ReactComponent = React.FunctionComponent<
    React.SVGProps<SVGAElement> & {title?: string}
    >

    export default ReactComponent
}

