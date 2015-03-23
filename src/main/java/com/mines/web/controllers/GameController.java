package com.mines.web.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mines.main.MineFieldGenerator;



@Controller
@RequestMapping("/game")
public class GameController {
	
	
	
	@RequestMapping(value = "/getField.do", method = GET, produces = "application/json")
	public @ResponseBody int[][] getField(HttpServletRequest request, HttpServletResponse response) throws IOException{
		return MineFieldGenerator.getInstance().getField();
	}
	
	@RequestMapping(value = "/new.do", method = GET, produces = "application/json")
	public void neww(@RequestParam(value="size", required=false, defaultValue="small") String size,
					 @RequestParam(value="difficulty", required=false, defaultValue="easy") String difficulty,
					HttpServletRequest request,
					HttpServletResponse response) throws IOException{
		
		MineFieldGenerator.getInstance().neww(size, difficulty);
	}
	
	@RequestMapping(value = "/getSize.do", method = GET, produces = "application/json")
	public @ResponseBody int getSize(HttpServletRequest request, HttpServletResponse response) throws IOException{
		return MineFieldGenerator.getInstance().getSize();
	}

	@RequestMapping(value = "/getNrMines.do", method = GET, produces = "application/json")
	public @ResponseBody int getNrMines(HttpServletRequest request, HttpServletResponse response) throws IOException{
		return MineFieldGenerator.getInstance().getNrMines();
	}
	
	

}
