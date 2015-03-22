package com.mines.web.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/", "/index.html"}, method = GET)
    public String redirectToWebUiIndex(HttpServletRequest r) {
        return "redirect:/web-ui/game.html";
    }

}
