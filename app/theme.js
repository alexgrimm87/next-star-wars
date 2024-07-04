import {extendTheme} from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white'
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline'
        }
      }
    }
  }
});
