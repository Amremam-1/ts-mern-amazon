import { useColorMode } from "@chakra-ui/react"
import { Button } from "react-bootstrap"

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    // <Switch
    //   isChecked={colorMode === "dark"}
    //   onChange={toggleColorMode}
    // ></Switch>
    <Button variant={colorMode} onClick={toggleColorMode}>
      <i className={colorMode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
    </Button>
  )
}

export default ColorModeSwitch
